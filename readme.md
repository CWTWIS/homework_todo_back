## service api

### /auth

| path      | method | authen? | params | body                                                  |
| --------- | ------ | ------- | ------ | ----------------------------------------------------- |
| /register | POST   | -       | none   | {s_code, password, confirmPassword, firstName, email} |
| /login    | POST   | -       | none   | {t_code, s_code, password}                            |
| /me       | GET    | t, s    | none   | none                                                  |

### /

| path      | method | authen? | params | body                                                            |
| --------- | ------ | ------- | ------ | --------------------------------------------------------------- |
| /homework | POST   | t       | none   | {question, startdate, duedate, published, subjectId, teacherId} |
| /homework | GET    | t       | none   | none                                                            |
| /homework | PUT    | t       | /:id   | {question, startdate, duedate, published, subjectId, teacherId} |
| /subject  | GET    | 0       | none   |                                                                 |

# homework_todo_back
