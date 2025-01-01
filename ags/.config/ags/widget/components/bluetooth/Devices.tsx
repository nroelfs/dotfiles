import {bind, Variable} from "astal"
import {Gtk, App} from "astal/gtk3"
import {SystemMenuWindowName} from "../../SystemMenu";
import Bluetooth from "gi://AstalBluetooth";


export function Devices() {
    const bluetooth = Bluetooth.get_default()

    return <box
        vertical={true}>
        {bind(bluetooth, "devices").as((devices) => {
            if (devices.length === 0) {
                return <label
                    className="labelMedium"
                    label="No devices"/>
            }
            return devices.filter((device) => {
                return device.name != null
            }).map((device) => {
                const buttonsRevealed = Variable(false)
                const connectionState = Variable.derive([
                    bind(device, "connected"),
                    bind(device, "connecting")
                ])

                setTimeout(() => {
                    bind(App.get_window(SystemMenuWindowName)!, "visible").subscribe((visible) => {
                        if (!visible) {
                            buttonsRevealed.set(false)
                        }
                    })
                }, 1_000)

                return <box
                    vertical={true}>
                    <button
                        hexpand={true}
                        className="systemMenuIconButton"
                        onClicked={() => {
                            buttonsRevealed.set(!buttonsRevealed.get())
                        }}>
                        <label
                            halign={Gtk.Align.START}
                            className="bluetoothlabel"
                            label={`  ${device.name}`}/>
                    </button>
                    <revealer
                        revealChild={buttonsRevealed()}
                        transitionDuration={200}
                        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
                        <box
                            vertical={true}>
                            <button
                                hexpand={true}
                                halign={Gtk.Align.START}
                                className="systemMenuIconButton"
                                visible={bind(device, "paired")}
                                label={connectionState((value) => {
                                    const connected = value[0]
                                    const connecting = value[1]
                                    if (connecting) {
                                        return "Connecting"
                                    } else if (connected) {
                                        return "Disconnect"
                                    } else {
                                        return "Connect"
                                    }
                                })}
                                onClicked={() => {
                                    if (device.connecting) {
                                        // do nothing
                                    } else if (device.connected) {
                                        device.disconnect_device((device, result, data) => {
                                            print("disconnected")
                                        })
                                    } else {
                                        device.connect_device((device, result, data) => {
                                            print("connected")
                                        })
                                    }
                                }}/>
                            <button
                                hexpand={true}
                                halign={Gtk.Align.START}
                                className="systemMenuIconButton"
                                visible={bind(device, "paired")}
                                label={bind(device, "trusted").as((trusted) => {
                                    if (trusted) {
                                        return "Untrust"
                                    } else {
                                        return "Trust"
                                    }
                                })}
                                onClicked={() => {
                                    device.set_trusted(!device.trusted)
                                }}/>
                            <button
                                hexpand={true}
                                halign={Gtk.Align.START}
                                className="systemMenuIconButton"
                                css={`margin-bottom: 4px;`}
                                label={bind(device, "paired").as((paired) => {
                                    return paired ? "Unpair" : "Pair"
                                })}
                                onClicked={() => {
                                    if (device.paired) {
                                        bluetooth.adapter.remove_device(device)
                                    } else {
                                        device.pair()
                                    }
                                }}/>
                        </box>
                    </revealer>
                </box>
            })
        })}
    </box>
}
