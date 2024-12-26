import { App } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import Battery from "gi://AstalBattery"
import Network from "gi://AstalNetwork"
import Tray from "gi://AstalTray"

// Components
import AudioSlider from "./components/AudioSlider"
import Time from "./components/Time"
import { SystemMenuWindowName } from "./SystemMenu"


function SysTray() {
    const tray = Tray.get_default()

    return <box>
        {bind(tray, "items").as(items => items.map(item => {
            if (item.iconThemePath)
                App.add_icons(item.iconThemePath)

            const menu = item.create_menu()

            return <button
                tooltipMarkup={bind(item, "tooltipMarkup")}
                onDestroy={() => menu?.destroy()}
                onClickRelease={self => {
                    menu?.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
                }}>
                <icon gIcon={bind(item, "gicon")} />
            </button>
        }))}
    </box>
}

function Wifi() {
    const { wifi } = Network.get_default()

    return (
    <box className="Wifi">
        <icon tooltipText={bind(wifi, "ssid").as(String)} icon={bind(wifi, "iconName")}/>
        <label label={bind(wifi, "ssid").as(String)} />
    </box>)
}

function BatteryLevel() {
    const bat = Battery.get_default()
    return (
    <box className="Battery" visible={bind(bat, "isPresent")}>
        <icon icon={bind(bat, "batteryIconName")} />
        <label label={bind(bat, "percentage").as(p =>`${Math.floor(p * 100)}%`)} />
    </box>
    )
}


function Workspaces() {
    const hypr = Hyprland.get_default()

    return <box className="Workspaces">
        {bind(hypr, "workspaces").as(wss => wss
            .sort((a, b) => a.id - b.id)
            .map(ws => (
                <button
                    className={bind(hypr, "focusedWorkspace").as(fw =>
                        ws === fw ? "focused" : "")}
                    onClicked={() => ws.focus()}>
                    {ws.id}
                </button>
            ))
        )}
    </box>
}

function FocusedClient() {
    const hypr = Hyprland.get_default()
    const focused = bind(hypr, "focusedClient")
    return <box className="Focused" visible={focused.as(Boolean)}>
            { focused.as(client => (client && <box>
                {/* <icon icon={bind(client, "gIcon").as(String)} /> */}
                <label label={ bind(client, "title").as(String)} />
            </box>
        ))}
    </box>
}

function MenuButton() {
    return <button
        className="iconButton menuButton"
        label=" "
        onClicked={() => {
            App.toggle_window(SystemMenuWindowName)
        }}/>
}


export const TopBarName = "topBar"
export default function (monitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    function closeSyseMenu(event: Gdk.Event){
        if (event.get_keyval()[1] === Gdk.KEY_Escape) {
            App.toggle_window(SystemMenuWindowName)
        }
    }
    return <window
        className="Bar"
        application={App}
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        onButtonPressEvent={() => closeSyseMenu}>
        <centerbox>
            <box hexpand halign={Gtk.Align.START}>
                <Workspaces />
            </box>
            <box>
                <FocusedClient />
            </box>
            <box hexpand halign={Gtk.Align.END} >
                <SysTray />
                <Wifi />
                <AudioSlider />
                <BatteryLevel />
                <Time />
                <MenuButton />
            </box>
        </centerbox>
    </window>
}