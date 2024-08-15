# All-in-Winget

A simple tool that seeks to replace bundles of installers with a generator of commands for winget (Microsoft's own package manager).

The hope is that instead of users having to trust third parties shipping installers free o malware, they now have
to trust Microsoft's winget tool, the winget default repo and that the `winget install` command is accurate to what
they selected (usually this can be easily checked by checking if the human-readable ids match).
