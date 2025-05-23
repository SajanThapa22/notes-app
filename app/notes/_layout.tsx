import { Stack } from "expo-router";
import React from "react";

const NoteLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
};

export default NoteLayout;
