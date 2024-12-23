import { ref, set, get } from "firebase/database";
import { db } from "./FirebaseConfig";

export function postUser(uid, email, username) {
  set(ref(db, `users/${uid}`), {
    email,
    username,
  });
}

export async function getUser(uid) {
  return get(ref(db, `users/${uid}`))
    .then((res) => {
      return res.val();
    })
    .catch((err) => {
      console.log("erroe");
    });
}

export function getGroupsByUID(uid) {
  return get(ref(db, `users/${uid}/groups`))
    .then((res) => {
      return res.val();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getGroupByGroupId(id) {
  return get(ref(db, `/groups/${id}`))
    .then((res) => {
      return res.val();
    })
    .catch((err) => {
      console.log(err);
    });
}
