#
#
#

# 
header "^pragma solidity [\^\~\>\<]?=?[0-9\.]*;"

color green "\<
color green "\<

# elementaryTypeName
color yellow "\<(address|bool|string|var|Int|Uint|byte|Byte|Fixed|Ufixed)\>"

# ReservedKeyword
color purple "\<(abstract|after|case|catch|default|final|in|inline|let|match|null|of|relocatable|static|switch|try|typeof|abstract|override)\>"

## String
color brightyellow "L?\"(\\"|[^"])*\""
color brightyellow "L?'(\'|[^'])*'"

#color brightwhite,blue start="\$\{" end="\}"

# primitiveType
color brightcyan "\\b(address|string\\d*|bytes\\d*|int\\d*|uint\\d*|bool|hash\\d*|var)\\b"

# struct
color pink "\\b(struct)(\\s+([A-Za-z_]\\w*))?\\b"


## Trailing spaces
color ,green "[[:space:]]+$"


## Highlighting regular comments
color brightblue "//.*"
color brightblue start="/\*" end="\*/"


# Highlighting for natspec comments
color magenta "@param [a-zA-Z_][a-z0-9A-Z_]+"
color magenta "@return"
color magenta "@notice"
color magenta "@dev"
color magenta "@dev"
color magenta "@inheritdoc"
color magenta "@author"
color magenta "@title"
color magenta "@custom"