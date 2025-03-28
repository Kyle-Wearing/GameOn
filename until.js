import { ref, set, get, push, update, child, remove } from "firebase/database";
import { db } from "./FirebaseConfig";
import { Calendar } from "react-native-calendars";

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

export async function getGroupsByUID(uid) {
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
    get(ref(db, `groups/${group_id}/members/${uid.uid}`)).then((res) => {
      const inc = Number(res.val().wins) + 1;
      const scoreInc = Number(res.val().score) + uids.length - index - 1;
      if (index === 0) {
        set(ref(db, `groups/${group_id}/members/${uid.uid}/wins`), inc);
      }
      set(ref(db, `groups/${group_id}/members/${uid.uid}/score`), scoreInc);
    });
  });
}

export async function updateUsername(uid, username) {
  set(ref(db, `users/${uid}/username`), username);
  const groups = await getGroupsByUID(uid);
  const groupIds = Object.keys(groups);
  groupIds.forEach((group_id) => {
    set(ref(db, `groups/${group_id}/members/${uid}/username`), username);
  });
}

export function leaveGroup(uid, group_id) {
  remove(ref(db, `groups/${group_id}/members/${uid}`));
  remove(ref(db, `users/${uid}/groups/${group_id}`));
}

export function getGroupCalendar(group_id) {
  return get(ref(db, `groups/${group_id}/calendar`))
    .then((res) => {
      return res.val() ? res.val() : [];
    })
    .catch((err) => {
      console.log("getGroupCalendar", err);
    });
}

export async function sheduleGame(group_id, date, name) {
  getGroupCalendar(group_id).then((res) => {
    const games = res[date] ? res[date] : [];
    games.push(name);
    const postRef = ref(db, `groups/${group_id}/calendar/${date}`);

    set(postRef, games);
  });
}
