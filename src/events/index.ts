import * as ready from "./base/ready"
import * as join from "./base/join"
import * as leave from "./base/leave"
import * as commands from "./system/commands"
import * as commandsSelect from "./components/selects/settings"
import * as commandsButton from "./components/buttons/settings"
import * as commandsBackButton from "./components/buttons/settings_back"
import * as leaderboard from "./components/buttons/leaderboard"
import * as russian from "./components/buttons/russian"
import * as voice_name from "./components/modals/voice_name"
import * as voice_limit from "./components/modals/voice_limit"
import * as voice_button from "./components/buttons/voice"
import * as voice_controller from "./base/voice"
import * as rating from "./base/rating"

export const events = [
  ready,
  commands,
  join,
  leave,
  commandsSelect,
  commandsButton,
  commandsBackButton,
  leaderboard,
  voice_button,
  voice_controller,
  voice_name,
  voice_limit,
  rating,
  russian,
]