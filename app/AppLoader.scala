import play.api.ApplicationLoader.Context
import play.api._

class AppLoader extends ApplicationLoader {
  override def load(context: Context): Application = {
    new AppComponents(context).application
  }
}
