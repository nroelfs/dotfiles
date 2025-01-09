import { bind, Variable } from "astal";
import { Widget } from "astal/gtk3";
import { Entry } from "astal/gtk3/widget";

const pwd = Variable<string>("");
const hide = Variable<boolean>(true);

export function getPassword() {
    return pwd.get();
}

export type PasswordProps = Widget.EntryProps & {
    hidden : boolean;
}



export function Password(props : PasswordProps = {hidden: true}) {

    const {hidden} = props || {hidden: true};
    hide.set(hidden);

    const val = Variable<string>("");

    const hideDisplay = (input : string) =>  {
        print("Password is: " + input);
        pwd.set(input);
        if (hide.get()) {
            let hidden = "";
            for (const c of input) {
                hidden += "*";
            }
            val.set(hidden);
        }else{
            val.set(pwd.get());
        }
    }
    return <entry text={bind(val).as(String)} onChanged={(e : Entry) =>  hideDisplay(e.text)}/>;

}