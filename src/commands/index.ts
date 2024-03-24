import * as ping from "./base/ping"
import * as bot from "./base/bot"
import * as balance from "./economy/balance"
import * as work from "./economy/work"
import * as crime from "./economy/crime"
import * as leaderboard from "./economy/leaderboard"
import * as to from "./economy/to"
import * as roulette from "./economy/roulette"
import * as russian from "./economy/russian"
import * as add from "./economy/add"
import * as buy from "./economy/buy"
import * as shop from "./economy/shop"
import * as delete_item from "./economy/delete_item"
import * as settings from "./moderation/settings"
import * as ban from "./moderation/ban"
import * as kick from "./moderation/kick"
import * as clear from "./moderation/clear"
import * as rank from "./rating/rank"
import * as reload from "./owner/reload"

export const commands = {
  ping,
  balance,
  work,
  crime,
  settings,
  ban,
  kick,
  clear,
  leaderboard,
  bot,
  rank,
  to,
  roulette,
  russian,
  add,
  delete_item,
  shop,
  buy,
  reload
}