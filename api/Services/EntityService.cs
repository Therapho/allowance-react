using AllowanceFunctions.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Data;
using api.Common;

namespace AllowanceFunctions.Services
{
    public abstract class EntityService<TEntity> where TEntity : Entity
    {
        protected DatabaseContext _context;

        public EntityService(DatabaseContext context)
        {
            _context = context;
        }
        public virtual async Task<TEntity> Get(int id)
        {
            
            TEntity result = default(TEntity);

            try
            {
                var query = from entity in _context.Set<TEntity>()
                            where entity.Id == id
                            select entity;

                result = await query.FirstOrDefaultAsync();
            }
            catch (Exception exception)
            {

                throw new DataException($"Error trying to Get {typeof(TEntity).Name} with id: {id}.  {exception.Message}", exception);
            }

            return result;
        }

        public async Task<int?> Create(TEntity entity, bool saveChanges = true)
        {
            try
            {
                await _context.Set<TEntity>().AddAsync(entity);
                if(saveChanges) await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {

                throw new DataException($"Error trying to CreateOrUpdate for {typeof(TEntity).Name}.  {exception.Message}", exception);
            }
            return entity.Id;
        }

        public async Task CreateList(List<TEntity> entityList, bool saveChanges = true)
        {
            try
            {
                await _context.Set<TEntity>().AddRangeAsync(entityList);
                if(saveChanges) await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {

                throw new DataException($"Error trying to CreateOrUpdateList for {typeof(TEntity).Name}. \n {Utility.ParseError(exception)}", exception);
            }


        }
        public async Task<int?> Update(TEntity entity, bool saveChanges = true)
        {

            try
            {
                _context.Set<TEntity>().Update(entity);
                if(saveChanges) await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {

                throw new DataException($"Error trying to CreateOrUpdate for {typeof(TEntity).Name}.  {exception.Message}", exception);
            }
            return entity.Id;
        }

        public async Task UpdateList(List<TEntity> entityList , bool saveChanges = true)
        {
            try
            {
                _context.Set<TEntity>().UpdateRange(entityList);
                if(saveChanges) await _context.SaveChangesAsync();
            }
            catch (Exception exception)
            {

                throw new DataException($"Error trying to CreateOrUpdateList for {typeof(TEntity).Name}.  {exception.Message}", exception);
            }


        }
        public void Delete(TEntity entity, bool saveChanges = true)
        {
            _context.Remove(entity);
            if (saveChanges) _context.SaveChanges();
        }
        public void Remove(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Detached;
        }

        public void Replace(TEntity oldEntity, TEntity newEntity)
        {
            _context.Entry(oldEntity).CurrentValues.SetValues(newEntity);
        }
        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}
