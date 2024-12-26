import { Variable, GLib} from "astal"


export default function Time({ format = " %e.%m.%Y %H:%M"}) {
    const time = Variable<string>("").poll(1000, () =>
        GLib.DateTime.new_now_local().format(format)!)

    return (
        <box className="Time">
            <label onDestroy={() => time.drop()} label={time()}/>
        </box>
    )

}