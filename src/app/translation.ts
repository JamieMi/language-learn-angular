import {Time} from './time';
  
export class Translation{
    sourcePhrase: string = "";
    translatedPhrase= "";
    createdDate!:Date;
    lastTestedDate:Date = new Date(0);
    done?:boolean = false;
    id:number = 0;

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
            
      let due = false;
      let lastMilestone = 0;

      milestones.forEach ((item, index) => {
        
        let milestoneMS = item.valueOf() * Time.MS_PER_DAY;
        let milestoneTime = this.createdDate.getTime() + milestoneMS;
        let testedMSSinceCreation = this.lastTestedDate.getTime() - this.createdDate.getTime();

        if (now.getTime() >=  milestoneTime){
          console.log("last tested: ",this.lastTestedDate);
          console.log("creation: ",this.createdDate);
          console.log("tested days since creation:",testedMSSinceCreation / Time.MS_PER_DAY, "testedMSSinceCreation:",testedMSSinceCreation," milestoneMS:",milestoneMS)

          if (testedMSSinceCreation < milestoneMS){
            console.log(item);
            due = true;
            lastMilestone = item.valueOf();          
          };
        };
      });
      if (!due) console.log("NOT DUE");
      return due;
    }

    public setCreatedDateBack(days:number){
      this.createdDate = new Date(this.createdDate.getTime() - Time.MS_PER_DAY * days);
    }

    public setCreatedDateForward(days:number){
      this.createdDate = new Date(this.createdDate.getTime() + Time.MS_PER_DAY * days);
    }

    public setTestedTimeBack(days:number){
      if (this.lastTestedDate.getTime() != 0)
      {
        this.lastTestedDate = new Date(this.lastTestedDate.getTime() - Time.MS_PER_DAY * days);
      }
    }

    public setTestedTimeForward(days:number){
      if (this.lastTestedDate.getTime() != 0)
      {
        this.lastTestedDate = new Date(this.lastTestedDate.getTime() + Time.MS_PER_DAY * days);
      }
    }
}