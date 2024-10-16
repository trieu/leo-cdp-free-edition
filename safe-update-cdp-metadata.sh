#!/bin/sh

cp leocdp-metadata.properties cdp-metadata.properties
sleep 2
git checkout leocdp-metadata.properties
git pull
sleep 1
cp cdp-metadata.properties leocdp-metadata.properties
sleep 1
rm cdp-metadata.properties