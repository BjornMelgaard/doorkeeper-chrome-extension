/*
 * Copyright 2011 Google Inc. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var doorkeeper = new OAuth2('doorkeeper', {
  client_id: '376ae013d72d20fd56f7ee05dc5927977024657d2183766afb7458f01f4610ea',
  client_secret: 'a692cd34db00f31feb0bfabc284298cd149b6f35f415a19f051d48d602552bb6',
  api_scope: 'public'
});

var API_HOST = 'https://doorkeeper-provider.herokuapp.com';
var API_URL = API_HOST + "/api/v1";

doorkeeper.authorize(function() {
  if(doorkeeper.getAccessToken())
    $('#display-token').text(doorkeeper.getAccessToken());

  $('.btn').click(function() {
    callApi($(this).attr('id'));
  });

  function callApi(action) {
    // Make an XHR that creates the task
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(event) {
      if (xhr.readyState == 4) {
        if(xhr.status == 200) {
          // Great success: parse response with JSON
          $('#message').text(xhr.response);

        } else {
          // Request failure: something bad happened
          $('#message').text('Error. Status returned: ' + xhr.status);
        }
      }
    };

    xhr.open('GET', API_URL + action, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + doorkeeper.getAccessToken());
    xhr.send();
  }
});
