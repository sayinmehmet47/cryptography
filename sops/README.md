# SOPS + Age Cheatsheet

## 1. Setup (One time per person)

Generate a key pair. Keep the private key safe!

```bash
mkdir -p ~/.config/sops/age
age-keygen -o ~/.config/sops/age/keys.txt
```

**Share your public key** (starts with `age1...`) with the team.

## 2. Configuration

Create `.sops.yaml` in the project root. This tells SOPS who can decrypt files.

```yaml
creation_rules:
  - path_regex: \.(yaml|env)$
    age: >-
      age1YOUR_KEY,
      age1TEAMMATE_KEY
```

## 3. Daily Commands

**Encrypt a file:**
```bash
sops -e config.yaml > config.enc.yaml
```

**Decrypt a file (print to screen):**
```bash
sops -d config.enc.yaml
```

**Edit a file (decrypts, opens editor, re-encrypts on save):**
```bash
sops config.enc.yaml
```
*Note: Ensure `SOPS_EDITOR="zed --wait"` is set in your shell config to use Zed.*

## 4. Managing Teammates

**Add a new teammate:**
1. Add their public key to `.sops.yaml`.
2. Run:
   ```bash
   sops updatekeys config.enc.yaml
   ```

**Remove a teammate (Key Rotation):**
1. Remove their key from `.sops.yaml`.
2. Run:
   ```bash
   sops updatekeys config.enc.yaml
   ```

## 5. CI/CD (GitHub Actions)

1. Save your private key content (`AGE-SECRET-KEY-...`) as a GitHub Secret named `SOPS_AGE_KEY`.
2. In your workflow:
   ```yaml
   - name: Decrypt
     run: |
       echo "${{ secrets.SOPS_AGE_KEY }}" > age-key.txt
       export SOPS_AGE_KEY_FILE=age-key.txt
       sops -d config.enc.yaml > config.yaml
   ```
