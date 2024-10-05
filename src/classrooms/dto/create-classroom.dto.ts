export class CreateClassroomDto {
    classroomId: string;
    name: string;
    building: string;
    level: number;
    width: number;
    length: number;
    computerEquipment: number;
    desk: number;
    currentChairs: number;
    currentTables: number;
    maxChairsCapacity: number;
    maxTablesCapacity: number;
    lamps: number;
    thermalLevel: string;
    airConditioning: boolean;
    dependencyId: string;  
  }
  