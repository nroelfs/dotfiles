
import {bind, Variable} from "astal"
import {Gtk, App} from "astal/gtk3"
import {SystemMenuWindowName} from "../../SystemMenu";
import {getBluetoothIcon, getBluetoothName, toggleBluetooth} from "../../utils/bluetooth";
import Bluetooth from "gi://AstalBluetooth";
import { Devices } from "./Devices";
import { Label } from "astal/gtk3/widget";

export default function () {
    const bluetooth = Bluetooth.get_default()
    const bluetoothChooserRevealed = Variable(false)

    setTimeout(() => {
        bind(App.get_window(SystemMenuWindowName)!, "visible").subscribe((visible) => {
            if (!visible) {
                bluetoothChooserRevealed.set(false)
            }
        })
    }, 1_000)

    return (
    <box>
        {bind(bluetooth, "isPowered").as((isPowered) => {
            if (!isPowered) {
                return <box>
                    <label label={"       "}/>
                    <label
                        className="labelMediumBold"
                        halign={Gtk.Align.START}
                        hexpand={true}
                        label={getBluetoothName()}/>
                    <button
                        className="systemMenuIconButton"
                        onClicked={() => {
                            toggleBluetooth()
                        }}
                        label={getBluetoothIcon()}/>
                </box>
            } else {
                return <box
                vertical={true}>
                <box
                    vertical={false}
                    className="row">
                    <button
                        className="iconButton"
                        label={bluetoothChooserRevealed((revealed): string => {
                            if (revealed) {
                                return ""
                            } else {
                                return ""
                            }
                        })}
                        onClicked={() => {
                            bluetoothChooserRevealed.set(!bluetoothChooserRevealed.get())
                        }}/>
                    <label
                        className="labelMediumBold"
                        halign={Gtk.Align.START}
                        hexpand={true}
                        label={getBluetoothName()}/>
                    <button
                        className="systemMenuIconButton"
                        onClicked={() => {
                            toggleBluetooth()
                        }}
                        label={getBluetoothIcon()}/>
                </box>
                <revealer
                    className="rowRevealer"
                    revealChild={bluetoothChooserRevealed()}
                    transitionDuration={200}
                    transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
                    <box
                        vertical={true}>
                        <box
                            vertical={false}>
                            <label
                                halign={Gtk.Align.START}
                                hexpand={true}
                                label="Devices"
                                className="labelLargeBold"/>
                            <button
                                className="systemMenuIconButton"
                                label={bind(bluetooth.adapter, "discovering").as((discovering) => {
                                    return discovering ? "Stop scanning" : "Scan"
                                })}
                                onClicked={() => {
                                    if (bluetooth.adapter.discovering) {
                                        bluetooth.adapter.stop_discovery()
                                    } else {
                                        bluetooth.adapter.start_discovery()
                                    }
                                }}/>
                        </box>
                        <Devices/>
                    </box>
                </revealer>
            </box>
            }
        })}
    </box>)
}