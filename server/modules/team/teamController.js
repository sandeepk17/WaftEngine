const httpStatus = require('http-status');
const Team = require('./teamSchema');
const otherHelper = require('../../helper/others.helper');
const teamConfig = require('./teamConfig');
const teamController = {};

teamController.saveTeam = async(req, res, next) => {
    try{
        let team = req.body;
        if(team && team._id) {

            team.updated_at = new Date();
            team.updated_by = req.user.id;
            const update = await Team.findByIdAndUpdate(team._id, {
                $set:team
            } , {new:true });
            return otherHelper.sendResponse(res,httpStatus.OK,true,update, null,teamConfig.save, null);

        }else {
            const team_email = await Team.findOne({email: req.body.email});
            if(team_email){
               const errors = {email: 'email already exists'};
               const data = { email: req.body.email };
               return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
            }else {
            team.added_at = new Date();
            // console.log(req.user);
            team.added_by = req.user.id;
            const new_team = new Team(team);
            const new_team_save = await new_team.save();
            return otherHelper.sendResponse(res,httpStatus.OK,true,new_team_save, null,teamConfig.get, null)
        }
        }

    }catch(err){
        next(err);
    }
}
teamController.getTeam = async(req, res, next) => {
    try{
      const get_team = await Team.find({is_deleted:true});
      return otherHelper.sendResponse(res,httpStatus.OK,true,get_team, null,teamConfig.save, null);
    }catch(err) {
        next(err);
    }
}

teamController.deleteTeam = async(req, res, next) => {
    try{
        const id = req.body._id;
        const delete_team = await Team.findByIdAndUpdate(id , {
            $set : {is_deleted:true , deleted_by: req.user.id}
        }, {new:true});
        return otherHelper.sendResponse(res,httpStatus.OK,true,delete_team, null,teamConfig.delete, null);

    }catch(err) {
        next(err);
    }
}

module.exports = teamController;
