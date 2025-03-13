
import { App, Gtk } from 'astal/gtk3';



export const SettingsWindowName = "settings"

export default function () {
    let window: Gtk.Window;
    return <window name={SettingsWindowName}
        application={App}
        setup={(self) => { window = self }}>
        <box>
            <label label="Settings" />
            hhggg
        </box>
    </window>

}