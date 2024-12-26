import { Astal, Gtk, Gdk } from "astal/gtk3"
import Notifd from "gi://AstalNotifd"
import Notification from "./Notification"
import { type Subscribable } from "astal/binding"
import { Variable, bind, timeout, GLib } from "astal"

const TIMEOUT_DELAY = 7_000


class NotifiationMap implements Subscribable {
    private map: Map<number, Gtk.Widget> = new Map()

    private var: Variable<Array<Gtk.Widget>> = Variable([])

    private notifiy() {
        this.var.set([...this.map.values()].reverse())
    }

    constructor() {
        const notifd = Notifd.get_default()


        // notifd.ignoreTimeout = true

        notifd.connect("notified", (_, id) => {
            let hideTimeout: GLib.Source | null = null

            if (notifd.dontDisturb) {
                return
            }

            this.set(id, Notification({
                notification: notifd.get_notification(id)!,

                onHoverLost: () => {
                    hideTimeout = setTimeout(() => {
                        this.delete(id)
                        hideTimeout?.destroy()
                        hideTimeout = null
                    }, TIMEOUT_DELAY)
                },
                onHover() {
                    hideTimeout?.destroy()
                    hideTimeout = null
                },
                setup: () => {
                    hideTimeout = setTimeout(() => {
                        this.delete(id)
                        hideTimeout?.destroy()
                        hideTimeout = null
                    }, TIMEOUT_DELAY)
                },
                useHistoryCss: false
            }))
        })

        notifd.connect("resolved", (_, id) => {
            this.delete(id)
        })
    }

    private set(key: number, value: Gtk.Widget) {
        this.map.get(key)?.destroy()
        this.map.set(key, value)
        this.notifiy()
    }

    private delete(key: number) {
        this.map.get(key)?.destroy()
        this.map.delete(key)
        this.notifiy()
    }

    // needed by the Subscribable interface
    get() {
        return this.var.get()
    }

    // needed by the Subscribable interface
    subscribe(callback: (list: Array<Gtk.Widget>) => void) {
        return this.var.subscribe(callback)
    }
}

export default function NotificationPopup(gdkmonitor: Gdk.Monitor) {
    const { TOP, RIGHT } = Astal.WindowAnchor
    const notifs = new NotifiationMap()

    return <window
        className="NotificationPopups"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | RIGHT}>
        <box vertical={true}>
            {bind(notifs)}
        </box>
    </window>
}