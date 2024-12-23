import { ref, set, get, push, update, child } from "firebase/database";
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

export async function getGroupByGroupId(id) {
  return get(ref(db, `groups/${id}`))
    .then((res) => {
      return res.val();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function createGroup(groupName, uid, username) {
  const user = { uid, username };
  const postRef = ref(db, "groups");
  const newPostRef = push(postRef);
  set(newPostRef, {
    groupName,
    members: [user],
  });
  return newPostRef;
}

export async function joinGroupById(group_id, uid) {
  const group = await getGroupByGroupId(group_id);
  set(ref(db, `users/${uid}/groups/${group_id}`), {
    groupName: group.groupName,
  });
}
