
  
export class Translation{
    sourcePhrase: string = "";
    translatedPhrase= "";
    createdTime!:Date;
    testTime?: Date[];
    done?:boolean = false;

    public checkDue() : boolean{
        var now = new Date();

        const milestones:number[] = [
            1, // 1 day
            2,
            3,
            4,
            7,
            10,
            16,
            32,
            80,
            130,
            180,
            270,
            365,   // 1 year
            730,   // 2
            1095,  // 3
            1460,  // 4
            1825,  // 5 
            2190,  // 6
            2555,  // 7
            0xFFFFFFFF // forever
            ];
            
      var due = false;
      milestones.forEach ((item, index) => {
        //if (this.now.getDate() >  this.lastTestedDate.getDate()){
        if (now.getDate() >=  this.createdTime.getDate() - 2){
          due = true;
        };
      });
      return due;
    }
}