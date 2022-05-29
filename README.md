<div align="middle" style="padding-top: 1rem;">
<img src="./logo.png" width="150" />
<br/>
<br/>
<h1>
 WellnessPro gym
</h1>
</div>

## Description

Welcome to wellnessPro monorepo, a gym application located in trujillo peru.

**Design:**

[figma](https://www.figma.com/file/UXrJQEVwVCB22a0zu1UIRv/wellnessGym?node-id=0%3A1)

## Folder structure

|            folder            |                       Description                       |
| :--------------------------: | :-----------------------------------------------------: |
|    [admin](./apps/admin)     |           administrator of all gym processes            |
|      [api](./apps/api/)      |                 api of the application                  |
| [admin-ui](./libs/admin-ui/) | library containing everything common between front apps |
|   [common](./libs/common)    |       common library between frontend and backend       |
|    [core](./libs/common/)    |                   core of the backend                   |

## Technologies

**Frontend:**

- [React](https://reactjs.org/)
- [next](https://nextjs.org/)
- [zuztand](https://zuztand.com/)
- [ckakra-ui](https://chakra-ui.com/)
- [apollo client](https://www.apollographql.com/docs/react/)
- [formik](https://formik.org/)

**Backend**

- [Nestjs](https://docs.nestjs.com/)
- [jest](https://jestjs.io/)
- [typeorm](https://typeorm.io/)
- [postgresql](https://www.postgresql.org/)
- [express](https://expressjs.com/)

**HTTP**

- [graphql](https://graphql.org/)

**DevOps**

- [Git](https://git-scm.com/)
- [dokku](https://dokku.com/d)
- [docker](https://www.docker.com/)

**Others**

- [Codegen](https://www.graphql-code-generator.com/)
- [nx](https://nx.dev/)

## Features

- **Authentication:** Use jwt for authenticated users for Control access to the application.
- **CRUD clients:** Create, Read, Update and Delete clients.
- **Asistences** Control of a customer's attendance.
- **CRUD plans:** Create, Read, Update and Delete plans.
- **CRUD Activities:** Create, Read, Update and Delete plans.
- **Contracts:** Creation of contracts and control of contract expiration.
- **CRUD assets:** Asset control, open an api for asset control
