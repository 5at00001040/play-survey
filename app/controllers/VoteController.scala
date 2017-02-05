package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import services._
import java.util.Date
import play.api.libs.json.Json
import play.api.libs.json.JsValue


@Singleton
class VoteController @Inject() (counter: VoteCounter) extends Controller {

  def index = Action {
    Ok(views.html.vote(new Preference("cyan", "purple")))
  }

  def getVoteApi = Action {

    val resMap = ((t: (Date, Long, Long)) => Map(
        "time" -> t._1.getTime().toString(),
        "cntA" -> t._2.toString(),
        "cntB" -> t._3.toString())
        )(counter.getNowCount())
    Ok(Json.toJson(resMap))

  }
  
  def postVoteApi = Action { implicit request => 
    val body: AnyContent = request.body
    val jsonBody: Option[JsValue] = body.asJson
    val vote =  (jsonBody.get \ "vote").asOpt[String]

    counter.addCount(vote.get)

    Ok("success")
  }

  def resetApi = Action {
    counter.resetCount()
    Ok("success")
  }
  
}
