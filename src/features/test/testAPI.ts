import { Test } from "./Test";
import { GetNextQuestionResponse } from "./GetNextQuestionResponse";

function getNextQuestion(token: string, testId: string): Promise<GetNextQuestionResponse> {
  const apiUrl : string = process.env.REACT_APP_API_URL!;
  return fetch(`${apiUrl}v1/test-taken/next?test-id=${testId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,    
    },
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText);
    }
  })
  .then(question => {
    return question
  })
  .catch(error => {
    return Promise.reject(error)
  });
}

function answerQuestion(token: string, testId: string, questionTitle: string, answerTitle: string): Promise<string> {
  const apiUrl : string = process.env.REACT_APP_API_URL!;
  return fetch(`${apiUrl}v1/test-taken?test-id=${testId}&question-title=${questionTitle}&answer-title=${answerTitle}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,    
    },
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText);
    }
  })
  .then(data => {
    return "ok"
  })
  .catch(error => {
    return Promise.reject(error)
  });
}


function getTestByTitle(token: string, title: string): Promise<Test> {
  const apiUrl : string = process.env.REACT_APP_API_URL!;
  return fetch(`${apiUrl}v1/test-by-title/${encodeURIComponent(title)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,    
    },
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText);
    }
  })
  .then(result => {
    return result;
  })
  .catch(error => {
    return Promise.reject(error)
  });
}

function getTestResult(token: string, testId: string): Promise<string> {
  const apiUrl : string = process.env.REACT_APP_API_URL!;
  return fetch(`${apiUrl}v1/test-taken?test-id=${testId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,    
    },
  })
  .then((response) => {
    if(response.status === 202) {
      return "";
    } else if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText);
    }
  })
  .then(result => {
    return result
  })
  .catch(error => {
    return Promise.reject(error)
  });
}

export { getNextQuestion, answerQuestion, getTestResult, getTestByTitle };