import { App, Widget} from "astal/gtk3"
import style from "./widget/styles/style.scss"
import TopBar from "./widget/TopBar"
import NotificationPopup from "./widget/components/notifications/NotificationPopup"
import SystemMenuWindow from "./widget/SystemMenu"
import Settings from "./widget/Settings"

App.start({
    instanceName: "AstalBar",
    css: style,
    main(...args: Array<string>) {
        App.get_monitors().map(TopBar);
        SystemMenuWindow();
        Settings();
        App.get_monitors().map(NotificationPopup);

    }
})