{
   async addTaskScore(app, noteUUID) {
    const tasks = await app.getNoteTasks({ uuid: noteUUID, includeDone: false });
    tasks.forEach(function(task){
      let newScore = Number(task.score.toFixed(2));
      let scoreMatch = task.content.match(/Score:\s*(\d+\.?\d*)/);
      let oldScore = scoreMatch ? Number(scoreMatch[1]) : null;
      if (!task.content.includes("Score:") || oldScore != newScore) {
       // const redText = '\\x1b[31mThis text is red\\x1b[0m';

        let newContent = task.content.replace(/\s*Score:\s*\d+\.?\d*$/, '');        
        newContent += ' Score: ' + newScore;
        app.updateTask(task.uuid, { content: newContent} );
      }
    });
  },

  async insertText(app) {
    const noteUUID = app.context.noteUUID;
    this.addTaskScore(app,noteUUID);
  },
  
  async dailyJotOption(app,noteHandle){
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const note = await app.notes.dailyJot(currentTimestamp);
    this.addTaskScore(app,note.uuid);
  }
} 
