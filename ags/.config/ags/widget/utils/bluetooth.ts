import Bluetooth from "gi://AstalBluetooth"

export function getBluetoothIcon() {
    const bluetooth = Bluetooth.get_default()

    if (bluetooth.adapter == null) {
        return "󰂲"
    } else {
        return "󰂯"
    }
}

export function getBluetoothName() {
    const bluetooth = Bluetooth.get_default()
    if (bluetooth.adapter == null) {
        return "No bluetooth adapter"
    } else {
        return "Bluetooth"
    }
}

export function toggleBluetooth() {
    const bluetooth = Bluetooth.get_default()
    bluetooth.adapter?.set_powered(!bluetooth.adapter?.powered)
}