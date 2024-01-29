## env

PORT =

---

## service api

### /auth

| path      | method | params | body                                                  |
| --------- | ------ | ------ | ----------------------------------------------------- |
| /register | POST   | none   | {s_code, password, confirmPassword, firstName, email} |
| /login    | POST   | none   | {t_code, s_code, password}                            |

### /
