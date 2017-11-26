# coding: utf-8
import os
import web
import commands
import datetime

os.environ["NLS_LANG"] = "AMERICAN_AMERICA.WE8ISO8859P1"
import cx_Oracle

fecha_hoy = datetime.datetime.now()

mes_proceso = fecha_hoy.month - 1
agno_proceso = fecha_hoy.year


class SIGPERDB(object):
  def __init__(self):
    # self.db = cx_Oracle.connect("adolfo/costillar@172.22.110.114/sigper")
    # cur = self.db.cursor()
    # res = cur.execute("select * from sigper_bcn.DoPerfCar, sigper_bcn.PeCargos, sigper_bcn.SelCon where DoPerfCar.PERF_CODCAR=PeCargos.Pl_CodCar and SelCon.SELCONCAR= DoPerfCar.PERF_CODCAR order by SelConFec desc")
    # self.db.commit() Cambio en la BD
    self.db = cx_Oracle.connect("adolfo/costillar@172.22.110.114/sigper")

  def searchRut(self,user_email):
      cur = self.db.cursor()
      sql = "SELECT rh_numinte,rh_dvnuint FROM sigper_bcn.PEDATPER WHERE rh_mail = '%s'" % (user_email)
      selectSearchRut = cur.execute(sql)

      out = []
      for i in selectSearchRut:
          out.append(i)

      if not sql:
          return False

      return out