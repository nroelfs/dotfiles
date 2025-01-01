import Notifd from "gi://AstalNotifd"
import { bind } from "astal"
import Notification from "./Notification"
import {Gtk} from "astal/gtk3"

export default function () {
    const notifications = Notifd.get_default()

    return <box
        vertical={true}
        css={`margin-bottom: 2px;`}
        heightRequest={300}>
        <box
            css={`margin: 0 5px 5px 5px;`}
            vertical={false}>
            <button
                className="iconButton"
                label={bind(notifications, "dontDisturb").as((dnd) => {
                    return dnd ? "󰂛" : "󰂚"
                })}
                onClicked={() => {
                    notifications.set_dont_disturb(!notifications.dontDisturb)
                }}/>
            <label
                className="labelMediumBold"
                label="Notifications"/>
            <box hexpand={true}/>
            <button
                className="iconButton"
                label="Clear all"
                onClicked={() => {
                    notifications.notifications.forEach((notification) => {
                        notification.dismiss()
                    })
                }}/>
        </box>
        {bind(notifications, "notifications").as((notificationsList) => {
            if (notificationsList === null ||notificationsList.length === 0) {
                return <label
                    className="labelSmall"
                    css={`margin-top: 8px; margin-bottom: 20px;`}
                    halign={Gtk.Align.CENTER}
                    label="All caught up"/>
            } else {
                return notificationsList.map((notification) => {
                    return <Notification
                        setup={() => {}}
                        onHoverLost={() => {}}
                        onHover={() => {}}
                        notification={notification}
                        useHistoryCss={true}/>
                })
            }
        })}
    </box>
}