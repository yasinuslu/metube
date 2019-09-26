#!/usr/bin/env bash

forward() {
  adb reverse tcp:19000 tcp:19000
  adb reverse tcp:19001 tcp:19001
  adb reverse tcp:19002 tcp:19002
  adb reverse tcp:19003 tcp:19003
  adb reverse tcp:1337 tcp:1337
}
