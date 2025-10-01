import { ref, set, get, push, update, child, remove } from "firebase/database";
import { db } from "./FirebaseConfig";
import axios from "axios";

const api = axios.create({
  baseURL: "https://oracleapex.com/ords/game0n/api/",
  timeout: 20000,
});

export async function postUser(id, username) {
  return api
    .post("/create", {
      id: id,
      username: username,
    })
    .then((res) => {
      return id;
    })
    .catch((err) => {
      console.log("post user", err);
    });
}

// export async function postUser(uid, email, username) {
//   set(ref(db, `users/${uid}`), {
//     email,
//     username,
//   });
// }

export async function getUser(id) {
  return api
    .get(`/users/${id}`)
    .then((res) => {
      return res.data.items[0];
    })
    .catch((err) => {
      console.log("get user", err);
    });
}

// export async function getUser(uid) {
//   return get(ref(db, `users/${uid}`))
//     .then((res) => {
//       return res.val();
//     })
//     .catch((err) => {
//       console.log("get user", err);
//     });
// }

export async function getGroupsByUID(uid) {
  return api
    .get(`${uid}/groups`)
    .then((res) => {
      return res.data.items;
    })
    .catch((err) => {
      console.log("get groups by uid", err);
    });
}

// export async function getGroupsByUID(uid) {
//   return get(ref(db, `users/${uid}/groups`))
//     .then((res) => {
//       return res.val();
//     })
//     .catch((err) => {
//       console.log("get groups by uid", err);
//     });
// }

export async function getGroupByGroupId(id) {
  return api
    .get(`groups/${id}`)
    .then((res) => {
      return res.data.items;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getGroupName(id) {
  return api
    .get(`groups/${id}/name`)
    .then((res) => {
      return res.data.items[0].name;
    })
    .catch((err) => {
      console.log("get group name", err);
    });
}

// export async function getGroupByGroupId(id) {
//   return get(ref(db, `groups/-${id}`))
//     .then((res) => {
//       return res.val();
//     })
//     .catch((err) => {
//       console.log("get group by id", err);
//     });
// }

export async function createGroup(creator_id, name) {
  return api
    .post("groups", {
      creator_id,
      name,
    })
    .then((res) => {
      return res.data.id;
    })
    .catch((err) => {
      console.log("create group", err);
      return false;
    });
}

// export function createGroup(groupName) {
//   const postRef = ref(db, "groups");
//   const newPostRef = push(postRef);
//   set(newPostRef, {
//     groupName,
//   });
//   return newPostRef;
// }

export async function joinGroupById(group_id, user_id) {
  return api
    .post(`groups/${group_id}`, { user_id })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      console.log("join group by id", err);
      return 404;
    });
}

// export async function joinGroupById(group_id, uid, username) {
//   const group = await getGroupByGroupId(group_id);
//   set(ref(db, `users/${uid}/groups/-${group_id}`), {
//     groupName: group.groupName,
//   });
//   set(ref(db, `groups/-${group_id}/members/${uid}`), {
//     username,
//     wins: 0,
//     score: 0,
//   });
// }

export async function checkInGroup(uid, group_id) {
  return api
    .get(`groups/${group_id}/members/${uid}`)
    .then((res) => {
      return res.data.count;
    })
    .catch((err) => {
      console.log("check in group", err.code);
    });
}

// export async function checkInGroup(group_id, uid) {
//   return get(ref(db, `groups/-${group_id}/members/${uid}`))
//     .then((res) => {
//       return res.val();
//     })
//     .catch((err) => {
//       console.log("check in group", err);
//     });
// }

export async function updateGroupSettings(group_id, name) {
  return api
    .put(`groups/${group_id}`, {
      name,
    })
    .then((res) => {
      return 200;
    })
    .catch((err) => {
      console.log("update group settings", err);
      return 400;
    });
}

// export function updateGroupSettings(group_id, newName, members) {
//   set(ref(db, `groups/-${group_id}/groupName`), newName);
//   members.forEach((member) => {
//     const uid = member.uid;
//     set(ref(db, `users/${uid}/groups/-${group_id}/groupName`), newName);
//   });
// }

export async function updateUsername(uid, username) {
  return api
    .put(`users/${uid}`, { username })
    .then((res) => {
      return 200;
    })
    .catch((err) => {
      console.log("update username", err);
    });
}

// export async function updateUsername(uid, username) {
//   set(ref(db, `users/${uid}/username`), username);
//   const groups = await getGroupsByUID(uid);
//   const groupIds = Object.keys(groups);
//   groupIds.forEach((group_id) => {
//     set(ref(db, `groups/${group_id}/members/${uid}/username`), username);
//   });
// }

export async function leaveGroup(uid, group_id) {
  return api.delete(`groups/${group_id}/members/${uid}`);
}

// export function leaveGroup(uid, group_id) {
//   remove(ref(db, `groups/${group_id}/members/${uid}`));
//   remove(ref(db, `users/${uid}/groups/${group_id}`));
// }

export async function getGroupGames(group_id) {
  return api
    .get(`groups/${group_id}/games`)
    .then((res) => {
      return res.data.items;
    })
    .catch((err) => {
      console.log("get group games", err);
    });
}

export async function createGame(group_id, name) {
  return api
    .post(`groups/${group_id}/games`, { name })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("create game", err);
    });
}

export async function addGameToGroup(group_id, game_id) {
  return api
    .post(`groups/${group_id}/games/${game_id}`)
    .then((res) => {
      return 200;
    })
    .catch((err) => {
      console.log("add game to group", err);
    });
}

export async function getGroupCalendar(group_id) {
  return api
    .get(`groups/${group_id}/calendar`)
    .then((res) => {
      return res.data.items;
    })
    .catch((err) => console.log("get group calendar", err));
}

// export function getGroupCalendar(group_id) {
//   return get(ref(db, `groups/${group_id}/calendar`))
//     .then((res) => {
//       return res.val() ? res.val() : [];
//     })
//     .catch((err) => {
//       console.log("getGroupCalendar", err);
//     });
// }

export async function sheduleGame(group_id, game_id, played_at) {
  return api
    .post(`groups/${group_id}/calendar`, { game_id, played_at })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("shedule game", err);
    });
}

// export async function sheduleGame(group_id, date, name) {
//   getGroupCalendar(group_id).then((res) => {
//     const games = res[date] ? res[date] : [];
//     games.push(name);
//     const postRef = ref(db, `groups/${group_id}/calendar/${date}`);

//     set(postRef, games);
//   });
// }

export async function unsheduleGame(session_id) {
  return api
    .delete(`session/${session_id}`)
    .then((res) => {
      return res.data.deleted_session_id;
    })
    .catch((err) => {
      console.log("unshedule game", err);
    });
}

export async function getElo(group_id, game_id) {
  return api
    .get(`groups/${group_id}/elo/${game_id}`)
    .then((res) => {
      return res.data.items;
    })
    .catch((err) => {
      console.log("get elo", err);
    });
}

export async function updateElo(players, group_id, game_id) {
  return api
    .post(`groups/${group_id}/elo/${game_id}`, players, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      console.log("update elo success:");
    })
    .catch((err) => {
      console.log("update elo error:", err.response);
    });
}

export async function setSessionScored(session_id, scored) {
  return api
    .put(`session/${session_id}`, { scored })
    .then((res) => {
      return res.data.status;
    })
    .catch((err) => {
      console.log("set session scored", err);
    });
}

export async function scoreSession(session_id, user_id, score, position) {
  return api
    .post(`session/${session_id}`, { user_id, score, position })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("score session", err);
    });
}

export async function getUserPerformance(user_id, group_id) {
  try {
    const response = await api.get(
      `groups/${group_id}/users/${user_id}/performance`,
      {
        headers: {
          Accept: "application/json", // ensure ORDS returns JSON
        },
      }
    );
    const parsedGames = JSON.parse(response.data.items[0].games);
    const data = response.data.items[0];
    const user = {
      username: data.username,
      avg_elo: data.total_avg_elo || 0,
      wins: data.total_wins || 0,
    };

    let games = [];

    if (parsedGames[0].game_name) {
      games = parsedGames.map((game) => {
        return {
          game_name: game.game_name,
          avg_elo: game.avg_elo,
          highest_score: game.highest_score,
          wins: game.wins,
        };
      });
    }

    return { user, games };
  } catch (error) {
    console.error("API request failed:", error.response || error);
    return [];
  }
}

export async function getGames() {
  return api
    .get("games")
    .then((res) => {
      return res.data.items;
    })
    .catch((err) => {
      console.log("get games", err);
    });
}

export async function getSessions(group_id) {
  return api
    .get(`groups/${group_id}/sessions`)
    .then((res) => {
      return res.data.items;
    })
    .catch((err) => {
      console.log("get sessions", err);
    });
}
