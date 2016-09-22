# See who is currently streaming on Twitch

## Improvements
- non-existing accounts: changes in Twitch API, now nothing gets returned for them. FCC wants a 'Account not found row'
- handle ajax errors
- order rows by status (streaming -> prepend, else append)
- conditional color - streaming have a background color, closed/non existent have grey text
- toggle to see only streaming / see all
- let user add streamers and remove streamers
- save a users 'followers' (streamers) to localStorage

## Maybe

- Let users delete and add streamers, building their personal follow list. Save to localstorage

