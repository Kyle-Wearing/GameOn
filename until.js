import { ref, set, get, push, update, child } from "firebase/database";
import { db } from "./FirebaseConfig";

export async function postUser(uid, email, username) {
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
      console.log("get user", err);
    });
}

export function getGroupsByUID(uid) {
  return get(ref(db, `users/${uid}/groups`))
    .then((res) => {
      return res.val();
    })
    .catch((err) => {
      console.log("get groups by uid", err);
    });
}

export async function getGroupByGroupId(id) {
  return get(ref(db, `groups/-${id}`))
    .then((res) => {
      return res.val();
    })
    .catch((err) => {
      console.log("get group by id", err);
    });
}

export function createGroup(groupName) {
  const postRef = ref(db, "groups");
  const newPostRef = push(postRef);
  set(newPostRef, {
    groupName,
  });
  return newPostRef;
}

export async function joinGroupById(group_id, uid, username) {
  const group = await getGroupByGroupId(group_id);
  set(ref(db, `users/${uid}/groups/-${group_id}`), {
    groupName: group.groupName,
  });
  set(ref(db, `groups/-${group_id}/members/${uid}`), {
    username,
    wins: 0,
    score: 0,
  });
}

export async function checkInGroup(group_id, uid) {
  return get(ref(db, `groups/-${group_id}/members/${uid}`))
    .then((res) => {
      return res.val();
    })
    .catch((err) => {
      console.log("check in group", err);
    });
}

export function updateGroupSettings(group_id, newName, members) {
  set(ref(db, `groups/-${group_id}/groupName`), newName);
  members.forEach((member) => {
    const uid = member.uid;
    set(ref(db, `users/${uid}/groups/-${group_id}/groupName`), newName);
  });
}

export function updateGroupScores(uids, group_id) {
  uids.forEach((uid, index) => {
    get(ref(db, `groups/${group_id}/members/${uid}`)).then((res) => {
      const inc = Number(res.val().wins) + 1;
      const scoreInc = Number(res.val().score) + uids.length - index - 1;
      if (index === 0) {
        set(ref(db, `groups/-${group_id}/members/${uid}/wins`), inc);
      }
      set(ref(db, `groups/-${group_id}/members/${uid}/score`), scoreInc);
    });
  });
}

export function updateUsername(uid, username) {
  set(ref(db, `users/${uid}/username`), username);
}
