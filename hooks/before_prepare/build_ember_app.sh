#!/bin/bash
# This script is different than the one in the post by Atomic Object. It's
# different to account for our different directory structure.
if [[ $CORDOVA_CMDLINE =~ release ]]; then
	echo "Creating production build of ember app"
	(cd ember* && ember build --environment=production)
else
	echo "Creating debug build of ember app"
	(cd ember* && ember build)
fi
