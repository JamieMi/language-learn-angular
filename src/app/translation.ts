import {Time} from './time';
  
export class Translation{
    sourcePhrase: string = "";
    translatedPhrase= "";
    createdTime!:Date;
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
            
      var due = false;
      var lastMilestone = 0;

      milestones.forEach ((item, index) => {
        
        console.log("Now (",now," >= ",this.createdTime);
        var milestoneMS = item.valueOf() * Time.MS_PER_DAY;
        var milestoneTime = this.createdTime.getTime() + milestoneMS;
        var testedMSSinceCreation = this.lastTestedDate.getTime() - this.createdTime.getTime();

        if (now.getTime() >=  milestoneTime){
          console.log("last tested: ",this.lastTestedDate);
          console.log("testedMSSinceCreation:",testedMSSinceCreation," milestoneMS:",milestoneMS)

          if (testedMSSinceCreation < milestoneMS){
            console.log(item);
            due = true;
            lastMilestone = item.valueOf();          
          };
        };
      });
      return due;
    }

    public setCreatedTimeBack(){
      this.createdTime = new Date(this.createdTime.getTime() - Time.MS_PER_DAY);
    }

    public setCreatedTimeForward(){
      this.createdTime = new Date(this.createdTime.getTime() + Time.MS_PER_DAY);
    }

    public setTestedTimeBack(){
      if (this.lastTestedDate.getTime() != 0)
      {
        this.lastTestedDate = new Date(this.lastTestedDate.getTime() - Time.MS_PER_DAY);
      }
    }

    public setTestedTimeForward(){
      if (this.lastTestedDate.getTime() != 0)
      {
        this.lastTestedDate = new Date(this.lastTestedDate.getTime() + Time.MS_PER_DAY);
      }
    }
}