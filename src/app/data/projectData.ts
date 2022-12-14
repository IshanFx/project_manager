import { Project } from '../model/Project';

export const projects :Project[] = [
    {
        "id": 1,
        "name": "Project 1",
        "tasks": [
          {
            "id": 1,
            "name": "Task 1",
            "status": "active",
            "description": "Task 1 description",
            "children": [
              {
                "id": 3,
                "name": "Task 1.1",
                "description": "Task 1.1 description",
                "status": "in-progress"
              },
              {
                "id": 6,
                "name": "Task 1.2",
                "description": "Task 1.2 description",
                "status": "in-progress",
                "children":[
                    {
                        "id": 8,
                        "name": "Task 1.2.1",
                        "description": "Task 1.2.1 description",
                        "status": "in-progress"
                    }
                ]
              }
            ]
          },
          {
            "id": 2,
            "name": "Task 2",
            "description": "Task 2 description",
            "status": "completed",
            "children": []
          }
        ]
    },
    {
        "id": 2,
        "name": "Project 2",
        "tasks": [
          {
            "id":4,
            "name": "Task 1",
            "status": "active",
            "description": "Task 1 description",
            "children": [
              {
                "id": 6,
                "name": "Task 1.1",
                "description": "Task 1.1 description",
                "status": "in-progress"
              }
            ]
          },
          {
            "id": 5,
            "name": "Task 2",
            "description": "Task 2 description",
            "status": "completed",
            "children": []
          }
        ]
    }
]