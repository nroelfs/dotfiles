import Mpris from "gi://AstalMpris"
import { bind, Variable} from "astal"
import { Astal, Gdk, Gtk} from "astal/gtk3"
export default function Media() {
    const mpris = Mpris.get_default()
    const visible = Variable(false);
    const mp = Variable<Astal.Box|null>(null);


    function setVisible() {
        visible.set(!visible.get());
    }


    const props = {
        modal:true,
        exclusity: Astal.Exclusivity.IGNORE,
        keymode: Astal.Keymode.ON_DEMAND,
        focus:true,
        onKeyPressEvent: function (self:Gtk.Window, event: Gdk.Event) {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
                self.hide()
        }
    }
    function onButtonLeftClick() {
        print(visible.get());
        setVisible();

    }

    return (
        <box vertical className="Media-Container">
            <button className="Media" onButtonPressEvent={() => onButtonLeftClick() }>
                {bind(mpris, "players").as(ps => ps[0] ? (
                    <box>
                        <box
                            className="Cover"
                            valign={Gtk.Align.CENTER}
                            css={bind(ps[0], "coverArt").as(cover =>
                                `background-image: url('${cover}');`
                            )}
                        />
                        <label
                            label={bind(ps[0], "title").as(() =>
                                `${ps[0].title} - ${ps[0].artist}`
                            )}
                        />
                    </box>
                ) : (
                    "Nothing Playing"
                ))}
            </button>
        </box>
    )
}