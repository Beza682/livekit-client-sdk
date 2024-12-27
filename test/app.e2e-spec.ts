import axios, { AxiosInstance, CustomParamsSerializer } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as SDK from '@livekit/sdk';
import { CreateRoomPayloadTypeEnum } from '@livekit/sdk';
import qs from 'qs';

describe('SDK Tests', () => {
  let app: INestApplication;
  let http: AxiosInstance;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    http = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        Authorization: 'key',
      },
      paramsSerializer: (params) => {
        console.log('govno', params);
        return qs.stringify(params);
      },
    });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/rooms (GET)', async () => {
    const createRoom = new SDK.CreateRoomApi(undefined, undefined, http);
    const getRooms = new SDK.GetRoomsApi(undefined, undefined, http);
    const joinRoom = new SDK.JoinRoomApi(undefined, undefined, http);
    const getParticipants = new SDK.GetParticipantsApi(
      undefined,
      undefined,
      http,
    );

    const ownerUserId = 'a980f158-0d70-485c-a498-be467d824cc1';
    const userId = '6c27410f-3cf3-4ee8-8a1f-611a47525c82';
    const payload = {
      displayName: 'test_room',
      type: CreateRoomPayloadTypeEnum.Public,
      userId: ownerUserId,
    };

    // const participants =
    //   await getParticipants.getParticipantsControllerGetParticipants([
    //     '5fca8011-72a4-4b02-b361-8a7d7ee50d01',
    //   ]);

    // const { data: createRoomData } =
    //   await createRoom.createRoomControllerCreateCall(payload);

    // const { data: joinData } = await joinRoom.joinRoomControllerJoinCall({
    //   roomName: createRoomData.roomName,
    //   displayName: 'JohnDoe',
    //   userId,
    // });

    // console.log(test);
    // console.log(createRoomData);
    // console.log(data);
    // console.log(joinData);
    // console.log(participants);

    const getRoomsData = await getRooms.getRoomsControllerGetRooms(1, 0, {
      name: '3ddd0323-09c6-4afa-be5f-60277fe2d8df',
    });
    // const getRoomsData = await getRooms.getRoomsControllerGetRooms({
    //   take: 1,
    //   skip: 0,
    //   filterBy: {
    //     name: '3ddd0323-09c6-4afa-be5f-60277fe2d8df',
    //   },
    // });
    console.log(getRoomsData.request.path);
    console.log(getRoomsData.data);
  });
});
