import Wp from "gi://AstalWp"
import { bind } from "astal"
import { Widget } from "astal/gtk3";

export default function AudioSlider(){
    const speaker = Wp.get_default()?.audio.defaultSpeaker!

    // let volume: number = bind(speaker, "volume").get();
    // let mute : boolean = bind(speaker, "mute").get();
    let icon: string = "󰝟";

    const calcVolume = (v: number) => {
        return Math.floor(v * 100);
    }

    const muted = (m: boolean) => {

        if(m){
            icon = "󰝟";
        }else{
            // TODO: Später überarbeiten
            // if(volume > 0.5){
            //     icon =  "󰕾";
            // }else if(volume > 0){
            //     icon = "󰖀"
            // }else{
            //     icon = "󰕿";
            // }
            icon = "󰕾";
        }
        return icon;
    }

    // bind(speaker, "volume").subscribe(v => { volume = v;});
    // bind (speaker, "mute").subscribe(m => { mute = m; muted(m)});

    return (
        <box className="AudioSlider">
            <label className="Icon" label={bind(speaker, "mute").as(m => `${muted(m)}`)}/>
            <label label={bind(speaker, "volume").as(v => `${calcVolume(v)}`)} />
            {/* <slider hexpand onDragged={({ value }) => speaker.volume = value} value={bind(speaker, "volume")}/> */}
        </box>
    )
}