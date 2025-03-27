import {Header} from "@/shared/ui/Header/Header";
import {Sidebar} from "@/shared/ui/Sidebar/Sidebar";

export default function LoginPage() {
    return (
      <div>
        <Header isLoggedIn={false} title={'Inctagram'}/>
          <Sidebar />
      </div>
    );
  }