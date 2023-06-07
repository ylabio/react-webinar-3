import SideLayout from "../../components/side-layout";
import { useNavigate } from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import "./style.css";
import { getLocalStorageItem } from "../../utils";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";


function ProfileForm () {
    const cn = bem('ProfileForm'); 
    const {t} = useTranslate();
    const navigate = useNavigate();

    const store = useStore();
    useInit(() => {
        const token = getLocalStorageItem("token");
            if(token) {
                store.actions.profile.getUserData(token);
            } else {
                navigate("/login");
            }
        }, []);
    
    const select = useSelector(state => ({
        username: state.profile.username, 
        phone: state.profile.phone,
        email: state.profile.email
    }), []);

    return (
         <SideLayout padding="medium">
            <div className={cn()}>
                <div className={cn("title")}>{t("profile.title")}</div>
                <div className={cn("flex")}>
                    <div className={cn("details")}>{t("user.name")}</div>
                    <div className={cn("bold")}>{select.username}</div>
                </div>
                <div className={cn("flex")}>
                    <div className={cn("details")}>{t("user.phone")}</div>
                    <div className={cn("bold")}>{select.phone}</div>
                </div>
                <div className={cn("flex")}>
                    <div className={cn("details")}>email: </div>
                    <div className={cn("bold")}>{select.email}</div>
                </div>
              
            </div>
         </SideLayout>   
    )
}

export default ProfileForm;