(defproject pixelsquiz "0.2.1"
  :description "Game engine for the Pixels Camp quiz"
  :url "https://github.com/pixelscamp/pixelscamp-quiz-stage"
  :dependencies [
    [org.clojure/clojure "1.9.0"]
    [org.clojure/core.async "0.4.474"]
    [org.clojure/tools.nrepl "0.2.13"]
    [org.clojure/tools.namespace "0.2.11"]
    [org.clojars.gjahad/debug-repl "0.3.3"]
    [reduce-fsm "0.1.4"]
    [http-kit "2.3.0"]
    [ring "1.7.0"]
    [ring/ring-defaults "0.3.2"]
    [compojure "1.6.1"]
    [org.clojars.torbjornvatn/hidapi "1.1"]
    [simple-time "0.2.1"]
    [clj-time "0.14.4"]  ; pulled in by simple-time
    [cheshire "5.8.1"]
    [org.craigandera/dynne "0.4.1"]
    [incanter/incanter-core "1.9.3"]  ; fix override warning (pulled in by dynne)
  ]
  :main ^:skip-aot pixelsquiz.core
  :target-path ".target/%s"
  :profiles {:uberjar {:aot :all}
             :dev {:source-paths ["dev"]}}
  :jvm-opts ["-Djava.awt.headless=true"]
  :repl-options {
    :host "127.0.0.1"
    :port 7888
  }
)
