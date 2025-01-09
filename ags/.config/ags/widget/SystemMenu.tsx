import {App, Astal} from "astal/gtk3"
import {bind, Variable} from "astal"
import {Gtk, Gdk} from "astal/gtk3"

import MediaPlayer from "./components/media/MediaPlayer"
import NotificationLog from "./components/notifications/NotificationLog"
import PowerOption from "./components/PowerOption"
import BluetoothControls from "./components/bluetooth/BluetoothControls"

import { calcWidth } from "./utils/screen"

export const SystemMenuWindowName = "systemWindow"

export default function () {
    const hide = Variable(false);
    const pwd = Variable<string>("");
    const setHide = (value: boolean) => {
        hide.set(value);
    }

    let window: Gtk.Window

    return <window
        className="systemMenu"
        exclusivity={Astal.Exclusivity.NORMAL}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.BOTTOM}
        layer={Astal.Layer.TOP}
        name={SystemMenuWindowName}
        application={App}
        margin={5}
        keymode={Astal.Keymode.ON_DEMAND}
        visible={false}
        onKeyPressEvent={function (self, event: Gdk.Event) {
            if (event.get_keyval()[1] === Gdk.KEY_Escape) {
                self.hide()
            }
        }}
        onLeaveNotifyEvent={function (self, event: Gdk.Event) {
            setHide(true);
            setTimeout(() => {
                // console.log(hide.get(), self.visible)
                if (hide.get() && self.visible) {
                    self.hide()
                    setHide(false)
                }
            },250)
        }}
        onFocusInEvent={function (self, event: Gdk.Event) {
            setHide(false);
        }}
        setup={(self) => {
            window = self
        }}>
        <box
            className="systemMenuContainer"
            vertical={true}>
            <box
                vertical={true}
                setup={(self) => {
                    setTimeout(() => {
                        bind(window, "hasToplevelFocus").subscribe((hasFocus) => {
                            if (hasFocus) {
                                self.className = "focusedWindow"
                            } else {
                                self.className = "window"
                            }
                        })
                    }, 1_000)
                }}>
                <scrollable
                    className="scrollWindow"
                    vscroll={Gtk.PolicyType.AUTOMATIC}
                    propagateNaturalHeight={true}
                    widthRequest={calcWidth("25%")}>
                        <box vertical>
                            <box margin={5}>
                                <NotificationLog/>
                            </box>
                            <box margin={5}>
                                <MediaPlayer/>
                            </box>
                            <box margin={5}>
                                <BluetoothControls/>
                            </box>
                            <box margin={5}>
                                <PowerOption/>
                            </box>
                        </box>
                </scrollable>
            </box>
            <box vexpand={true}/>
        </box>
    </window>
}