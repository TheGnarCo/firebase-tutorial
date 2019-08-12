export type Group = {
  title: string,
}

export type User = {
  name: string,
}

export type MemberList = {
  [userId: string]: true,
}
