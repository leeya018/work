import { User } from "@/interfaces/User";
import { autorun, makeAutoObservable, toJS } from "mobx";

class UserS {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (newUser: any) => {
    if (!newUser) {
      this.user = null;
      return;
    }
    const { photoURL, uid, displayName, email } = newUser;
    this.user = { photoURL, uid, displayName, email };
  };

  updateUser = (info: any) => {
    this.user = { ...this.user, ...info };
  };

  clearUser() {
    this.user = null;
  }
}

const userStore = new UserS();
export default userStore;

autorun(() => {
  console.log(toJS(userStore.user));
});
