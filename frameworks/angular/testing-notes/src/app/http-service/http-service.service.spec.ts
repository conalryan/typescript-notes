import {inject, TestBed} from '@angular/core/testing';
import {ResponseOptions, XHRBackend} from '@angular/http';

import {HttpServiceService} from './http-service.service';
import {MockBackend} from '@angular/http/testing';
import {HttpClientModule} from '@angular/common/http';

const mockResponse = {
  data: [
    {
      'userId': 1,
      'id': 1,
      'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\n'
    },
    {
      'userId': 1,
      'id': 2,
      'title': 'qui est esse',
      'body': 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\n'
    },
    {
      'userId': 1,
      'id': 3,
      'title': 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      'body': 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\n'
    },
    {
      'userId': 1,
      'id': 4,
      'title': 'eum et est occaecati',
      'body': 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\n'
    }
  ]
};

describe('HttpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpServiceService, {provide: XHRBackend, useClass: MockBackend}]
    });
  });

  it('should make a get request', inject([HttpServiceService, XHRBackend], (service: HttpServiceService, mockBackend) => {

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    service.get().subscribe((res) => {
      expect(res.length).toBe(4);
      expect(res[0].userId).toEqual(1);
      expect(res[1].id).toEqual(2);
      expect(res[2].title).toEqual('qui est esse');
      expect(res[3].body).toEqual('ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\n');
    });
  }));
});
