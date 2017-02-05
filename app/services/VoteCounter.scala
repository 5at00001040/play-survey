package services

import java.util.concurrent.atomic.AtomicLong
import javax.inject._
import java.util.Date


trait VoteCounter {
  def getNowCount(): (Date, Long, Long)
  def addCount(vote: String): Unit
  def resetCount(): Unit
}

@Singleton
class AbVoteCounter extends VoteCounter {  
  private val counterA = new AtomicLong()
  private val counterB = new AtomicLong()
  override def getNowCount(): (Date, Long, Long) = (new Date(), counterA.get(), counterB.get())
  override def addCount(vote: String): Unit = 
    if(vote == "A") counterA.getAndIncrement() else counterB.getAndIncrement()
  override def resetCount(): Unit = {
      counterA.set(0)
      counterB.set(0)
    }
}

