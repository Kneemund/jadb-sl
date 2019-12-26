## COMMANDS

|   `<>`   |   `[]`   |  `\|`  | `UPPER_CASE` | `lower_case` |    `...`    |
| :------: | :------: | :---: | :----------: | :----------: | :---------: |
| required | optional |  or   |   replace    |     keep     | array/chain |

---

- `announce [MESSAGE|MESSAGE_WITH_IMAGE]`:  
  Sends an announcement to all users which share at least one guild with the bot and that want to be notified (`notify`) about an initialized channel.

- `ban <@USER|USER_ID> <REASON>`:  
  Ban a user.

- `channel <init|reset|config|info>`:  
  Commands to manage and get information about channels.

    - `channel init <@USER> [@USER...]`:  
      Links a user/multiple users to a channel and automatically grants them channel overwrites for managing the channel, creating webhooks and access to other light-weight moderation commands.

    - `channel reset`:  
      Resets the channel and deletes its data in the database.

    - `channel config <text|link|thumbnail|reset>`:  
      Setup information for `download` and other commands that require information about the channel.

        - `channel config text <TEXT>`
        - `channel config link <URL>`
        - `channel config thumbnail <URL> [true|false]`:  
          Put `true` behind the `URL` to use the website's favicon as thumbnail.
        - `channel config reset`:  
          Resets the configuration of the channel and deletes it from the database.

    - `channel info`:  
      Displays information about the channel owner(s).

- `download`:  
  Provides a download message containing the information specified with `channel config`.

- `help [PAGE]`:  
  Sends a message with commands (6 per page) and brief explanations/usage information.

- `kick <@USER|USER_ID> <REASON>`:  
  Kick a user.

- `lockdown [remove]`:  
  Locks/unlocks the channel for everyone besides whitelisted roles and the channel owner(s).

- `notify [remove]`:  
  Get notified via DMs whenever the channel owner(s) make(s) an announcement.

- `optifine <download|server>`:  
  Sends the link to the OptiFine download page or the invite link to OptiFine's Discord server. 

- `ping`:  
  Calculates the latency of the bot.

- `purge <AMOUNT>`:  
  Delete up to 100 messages at once that are less than 2 weeks old.

- `server <config|prefix|autorole|nolockdown|sort>`:  
  Show and edit settings of the bot.

    - `server config`:  
      Displays the current configuration of the bot in this server.

    - `server prefix <PREFIX>`:  
      Edit the prefix of the bot.  
      DEFAULT: `!`

    - `server autorole <@ROLE|ROLE_ID|remove>`:  
      Specify the role that is given to every user that joins the server or `remove` it to disable the feature.  
      DEFAULT: `NONE` (disabled)

    - `server nolockdown <@ROLE|ROLE_ID|remove> [@ROLE...|@ROLE_ID...]`:  
      Specify the roles that are whitelisted during `lockdown` or `remove` them to disable whitelisted roles.  
      DEFAULT: `NONE` (disabled)

    - `server sort <CATEGORY_NAME|CATEGORY_ID|remove> [CATEGORY_NAME...|CATEGORY_ID...]:`  
      Specify the channel categories that get sorted alphabetically whenever a channel gets updated or created or `remove` them to disable the feature.  
      DEFAULT: `NONE` (disabled).

- `unban <@USER|USER_ID> <REASON>`:  
  Unban a user.

- `uptime`:  
  Shows the uptime of the bot.

- `wiki`:  
  Sends a link to the shader wiki.
